import prisma from '../config/db.js';
import { logAudit } from '../middleware/audit.js';

export const getSettings = async (req, res, next) => {
  try {
    const settings = await prisma.siteSetting.findMany();
    // Transform into clean key-value object map
    const map = {};
    for (const item of settings) {
      if (item.type === 'number') {
        map[item.key] = Number(item.value);
      } else if (item.type === 'boolean') {
        map[item.key] = item.value === 'true';
      } else if (item.type === 'json') {
        try {
          map[item.key] = JSON.parse(item.value);
        } catch {
          map[item.key] = item.value;
        }
      } else {
        map[item.key] = item.value;
      }
    }

    return res.json({ success: true, data: map, raw: settings });
  } catch (error) {
    next(error);
  }
};

export const updateSetting = async (req, res, next) => {
  try {
    const { key } = req.params;
    const { value, type = 'string' } = req.body;

    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value: stringValue, type },
      create: { key, value: stringValue, type },
    });

    await logAudit({
      userId: req.user.id,
      action: 'SETTING_UPDATE',
      resourceType: 'SiteSetting',
      resourceId: key,
      req,
      metadata: { key, value: stringValue },
    });

    return res.json({ success: true, data: setting, message: 'Setting updated.' });
  } catch (error) {
    next(error);
  }
};

export const updateBulkSettings = async (req, res, next) => {
  try {
    const { settings } = req.body; // array of { key, value, type } or key-value object

    if (Array.isArray(settings)) {
      for (const item of settings) {
        const stringVal = typeof item.value === 'object' ? JSON.stringify(item.value) : String(item.value);
        await prisma.siteSetting.upsert({
          where: { key: item.key },
          update: { value: stringVal, type: item.type || 'string' },
          create: { key: item.key, value: stringVal, type: item.type || 'string' },
        });
      }
    } else if (typeof settings === 'object') {
      for (const [key, val] of Object.entries(settings)) {
        const stringVal = typeof val === 'object' ? JSON.stringify(val) : String(val);
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value: stringVal },
          create: { key, value: stringVal },
        });
      }
    }

    await logAudit({
      userId: req.user.id,
      action: 'SETTINGS_BULK_UPDATE',
      resourceType: 'SiteSetting',
      req,
    });

    return res.json({ success: true, message: 'Settings updated successfully.' });
  } catch (error) {
    next(error);
  }
};
