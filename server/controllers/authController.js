// authController.js
export const authSuccess = (req, res) => {
  try {
    if (!req.user) {
      console.error('❌ No user found in auth success');
      return res.redirect(process.env.CLIENT_ORIGIN + '/#/login?error=no_user');
    }

    console.log('✅ Auth success for user:', req.user.name, req.user.email);
    
    // Update last login time
    req.user.lastLogin = new Date();
    req.user.save();

    // Redirect to client app after successful login using HashRouter
    res.redirect(process.env.CLIENT_ORIGIN + "/#/dashboard");
  } catch (error) {
    console.error('❌ Error in auth success:', error);
    res.redirect(process.env.CLIENT_ORIGIN + '/#/login?error=auth_failed');
  }
};

export const logout = (req, res, next) => {
  try {
    console.log('🚪 Logging out user:', req.user?.name);
    
    req.logout((err) => {
      if (err) {
        console.error('❌ Logout error:', err);
        return next(err);
      }
      
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.status(200).json({ 
          success: true, 
          message: "Logged out successfully" 
        });
      });
    });
  } catch (error) {
    console.error('❌ Error in logout:', error);
    res.status(500).json({ 
      success: false, 
      message: "Logout failed" 
    });
  }
};

export const getCurrentUser = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        authenticated: false, 
        message: "No user session found" 
      });
    }

    res.json({
      authenticated: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        picture: req.user.picture,
        lastLogin: req.user.lastLogin
      }
    });
  } catch (error) {
    console.error('❌ Error getting current user:', error);
    res.status(500).json({ 
      authenticated: false, 
      message: "Error retrieving user data" 
    });
  }
};