import prisma from '../config/db.js';

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: 'desc' },
      take: 30,
    });
    const unreadCount = await prisma.notification.count({
      where: { isRead: false },
    });

    return res.json({ success: true, data: notifications, unreadCount });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id === 'all') {
      await prisma.notification.updateMany({
        where: { isRead: false },
        data: { isRead: true },
      });
      return res.json({ success: true, message: 'All notifications marked as read.' });
    }

    const updated = await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });

    return res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.notification.delete({ where: { id } });
    return res.json({ success: true, message: 'Notification removed.' });
  } catch (error) {
    next(error);
  }
};
