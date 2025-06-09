import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AccountSecurity = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [twoFactorAuth, setTwoFactorAuth] = useState({
    enabled: false,
    method: 'app',
    backupCodes: [],
    phoneNumber: '+1 (555) 123-4567'
  });

  const [loginSessions, setLoginSessions] = useState([
    {
      id: 1,
      device: 'MacBook Pro',
      browser: 'Chrome 118.0',
      location: 'San Francisco, CA',
      lastActive: '2 minutes ago',
      current: true,
      ipAddress: '192.168.1.100'
    },
    {
      id: 2,
      device: 'iPhone 15',
      browser: 'Safari Mobile',
      location: 'San Francisco, CA',
      lastActive: '1 hour ago',
      current: false,
      ipAddress: '192.168.1.101'
    },
    {
      id: 3,
      device: 'Windows PC',
      browser: 'Firefox 119.0',
      location: 'New York, NY',
      lastActive: '3 days ago',
      current: false,
      ipAddress: '203.0.113.45'
    }
  ]);

  const [securitySettings, setSecuritySettings] = useState({
    emailNotifications: true,
    loginAlerts: true,
    passwordExpiry: false,
    sessionTimeout: 30,
    allowMultipleSessions: true
  });

  const [errors, setErrors] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async () => {
    if (validatePasswordForm()) {
      setIsChangingPassword(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      // Show success message
    }
  };

  const handleToggle2FA = () => {
    setTwoFactorAuth(prev => ({
      ...prev,
      enabled: !prev.enabled
    }));
  };

  const handleGenerateBackupCodes = () => {
    const codes = Array.from({ length: 8 }, () => 
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );
    setTwoFactorAuth(prev => ({
      ...prev,
      backupCodes: codes
    }));
    setShowBackupCodes(true);
  };

  const handleTerminateSession = (sessionId) => {
    setLoginSessions(prev => prev.filter(session => session.id !== sessionId));
  };

  const handleTerminateAllSessions = () => {
    setLoginSessions(prev => prev.filter(session => session.current));
  };

  const handleSecuritySettingChange = (setting, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const getDeviceIcon = (device) => {
    if (device.includes('iPhone') || device.includes('Android')) return 'Smartphone';
    if (device.includes('iPad') || device.includes('Tablet')) return 'Tablet';
    if (device.includes('Mac')) return 'Monitor';
    return 'Monitor';
  };

  return (
    <div className="space-y-8">
      {/* Change Password */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Change Password</h3>
        <p className="text-text-secondary text-sm mb-6">
          Update your password to keep your account secure. Use a strong password with at least 8 characters.
        </p>
        
        <div className="border border-border rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-primary focus:border-transparent ${
                  errors.currentPassword ? 'border-error' : 'border-border'
                }`}
                placeholder="Enter your current password"
              />
              {errors.currentPassword && (
                <p className="text-error text-sm mt-1">{errors.currentPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-primary focus:border-transparent ${
                  errors.newPassword ? 'border-error' : 'border-border'
                }`}
                placeholder="Enter your new password"
              />
              {errors.newPassword && (
                <p className="text-error text-sm mt-1">{errors.newPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-primary focus:border-transparent ${
                  errors.confirmPassword ? 'border-error' : 'border-border'
                }`}
                placeholder="Confirm your new password"
              />
              {errors.confirmPassword && (
                <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              onClick={handlePasswordSubmit}
              disabled={isChangingPassword}
              className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed nav-transition"
            >
              {isChangingPassword ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <Icon name="Lock" size={18} />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Two-Factor Authentication</h3>
        <p className="text-text-secondary text-sm mb-6">
          Add an extra layer of security to your account with two-factor authentication.
        </p>
        
        <div className="border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-medium text-text-primary">Enable Two-Factor Authentication</h4>
              <p className="text-text-secondary text-sm">
                {twoFactorAuth.enabled ? 'Your account is protected with 2FA' : 'Secure your account with 2FA'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={twoFactorAuth.enabled}
                onChange={handleToggle2FA}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 
                            peer-focus:ring-primary-100 rounded-full peer 
                            peer-checked:after:translate-x-full peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all 
                            peer-checked:bg-primary"></div>
            </label>
          </div>

          {twoFactorAuth.enabled && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Authentication Method
                </label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="authMethod"
                      value="app"
                      checked={twoFactorAuth.method === 'app'}
                      onChange={(e) => setTwoFactorAuth(prev => ({ ...prev, method: e.target.value }))}
                      className="w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <div className="flex items-center space-x-2">
                      <Icon name="Smartphone" size={18} className="text-text-muted" />
                      <span className="text-text-secondary">Authenticator App (Recommended)</span>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="authMethod"
                      value="sms"
                      checked={twoFactorAuth.method === 'sms'}
                      onChange={(e) => setTwoFactorAuth(prev => ({ ...prev, method: e.target.value }))}
                      className="w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <div className="flex items-center space-x-2">
                      <Icon name="MessageSquare" size={18} className="text-text-muted" />
                      <span className="text-text-secondary">SMS Text Message</span>
                    </div>
                  </label>
                </div>
              </div>

              {twoFactorAuth.method === 'sms' && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={twoFactorAuth.phoneNumber}
                    onChange={(e) => setTwoFactorAuth(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={handleGenerateBackupCodes}
                  className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-surface nav-transition"
                >
                  <Icon name="Key" size={16} />
                  <span>Generate Backup Codes</span>
                </button>
                
                {twoFactorAuth.backupCodes.length > 0 && (
                  <button
                    onClick={() => setShowBackupCodes(true)}
                    className="flex items-center space-x-2 px-4 py-2 text-primary hover:bg-primary-50 rounded-lg nav-transition"
                  >
                    <Icon name="Eye" size={16} />
                    <span>View Backup Codes</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Sessions */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Active Sessions</h3>
        <p className="text-text-secondary text-sm mb-6">
          Monitor and manage your active login sessions across different devices.
        </p>
        
        <div className="space-y-4">
          {loginSessions.map((session) => (
            <div key={session.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center">
                    <Icon name={getDeviceIcon(session.device)} size={20} className="text-text-muted" />
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-text-primary">{session.device}</h4>
                      {session.current && (
                        <span className="px-2 py-1 bg-success-light text-success text-xs rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-text-secondary text-sm">{session.browser}</p>
                    <p className="text-text-muted text-xs">
                      {session.location} • {session.lastActive} • {session.ipAddress}
                    </p>
                  </div>
                </div>
                
                {!session.current && (
                  <button
                    onClick={() => handleTerminateSession(session.id)}
                    className="flex items-center space-x-2 px-3 py-2 text-error hover:bg-error-light rounded-lg nav-transition"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Terminate</span>
                  </button>
                )}
              </div>
            </div>
          ))}
          
          <button
            onClick={handleTerminateAllSessions}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-error 
                     text-error hover:bg-error-light rounded-lg nav-transition"
          >
            <Icon name="LogOut" size={18} />
            <span>Terminate All Other Sessions</span>
          </button>
        </div>
      </div>

      {/* Security Settings */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Security Settings</h3>
        <p className="text-text-secondary text-sm mb-6">
          Configure additional security options for your account.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Email Security Notifications</h4>
              <p className="text-text-secondary text-sm">Get notified of security events via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.emailNotifications}
                onChange={(e) => handleSecuritySettingChange('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 
                            peer-focus:ring-primary-100 rounded-full peer 
                            peer-checked:after:translate-x-full peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all 
                            peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Login Alerts</h4>
              <p className="text-text-secondary text-sm">Receive alerts for new device logins</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.loginAlerts}
                onChange={(e) => handleSecuritySettingChange('loginAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 
                            peer-focus:ring-primary-100 rounded-full peer 
                            peer-checked:after:translate-x-full peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all 
                            peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Allow Multiple Sessions</h4>
              <p className="text-text-secondary text-sm">Allow login from multiple devices simultaneously</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.allowMultipleSessions}
                onChange={(e) => handleSecuritySettingChange('allowMultipleSessions', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 
                            peer-focus:ring-primary-100 rounded-full peer 
                            peer-checked:after:translate-x-full peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all 
                            peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-text-primary">Session Timeout</h4>
                <p className="text-text-secondary text-sm">Automatically log out after inactivity</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="15"
                max="120"
                step="15"
                value={securitySettings.sessionTimeout}
                onChange={(e) => handleSecuritySettingChange('sessionTimeout', parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-text-secondary text-sm w-20">
                {securitySettings.sessionTimeout} minutes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Backup Codes Modal */}
      {showBackupCodes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-500">
          <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Backup Codes</h3>
              <button
                onClick={() => setShowBackupCodes(false)}
                className="p-2 hover:bg-surface rounded-lg nav-transition"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <p className="text-text-secondary text-sm mb-4">
              Save these backup codes in a secure location. Each code can only be used once.
            </p>
            
            <div className="bg-surface p-4 rounded-lg mb-4">
              <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                {twoFactorAuth.backupCodes.map((code, index) => (
                  <div key={index} className="text-text-primary">
                    {code}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => navigator.clipboard.writeText(twoFactorAuth.backupCodes.join('\n'))}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-surface nav-transition"
              >
                Copy Codes
              </button>
              <button
                onClick={() => setShowBackupCodes(false)}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSecurity;