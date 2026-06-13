export const getNotifications = async (req, res) => {

    res.json({
        success: true,
        notifications: []
    });

};

export const markAsRead = async (req, res) => {

    res.json({
        success: true,
        message: "Notification marked as read"
    });

};