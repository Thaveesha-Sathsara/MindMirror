export const me = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        authenticated: false, 
        message: "No user session found" 
      });
    }

    // Return user data with additional info
    res.json({
      authenticated: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        picture: req.user.picture,
        lastLogin: req.user.lastLogin,
        createdAt: req.user.createdAt
      }
    });
  } catch (error) {
    console.error('❌ Error in user controller:', error);
    res.status(500).json({ 
      authenticated: false, 
      message: "Error retrieving user data" 
    });
  }
};
