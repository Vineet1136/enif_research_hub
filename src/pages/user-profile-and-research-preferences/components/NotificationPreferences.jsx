import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const NotificationPreferences = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    newPapers: { enabled: true, frequency: 'daily' },
    authorUpdates: { enabled: true, frequency: 'immediate' },
    categoryUpdates: { enabled: false, frequency: 'weekly' },
    recommendations: { enabled: true, frequency: 'weekly' },
    systemUpdates: { enabled: true, frequency: 'immediate' },
    newsletter: { enabled: false, frequency: 'monthly' }
  });

  const [pushNotifications, setPushNotifications] = useState({
    browserNotifications: true,
    mobileNotifications: false,
    desktopNotifications: true
  });

  const [digestSettings, setDigestSettings] = useState({
    enabled: true,
    frequency: 'weekly',
    day: 'monday',
    time: '09:00',
    includeRecommendations: true,
    includeTrending: true,
    includeBookmarks: false,
    maxPapers: 10
  });

  const [quietHours, setQuietHours] = useState({
    enabled: true,
    startTime: '22:00',
    endTime: '08:00',
    timezone: 'America/New_York'
  });

  const handleEmailNotificationChange = (type, field, value) => {
    setEmailNotifications(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const handlePushNotificationChange = (type, value) => {
    setPushNotifications(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleDigestSettingChange = (field, value) => {
    setDigestSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQuietHoursChange = (field, value) => {
    setQuietHours(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const notificationTypes = [
    {
      key: 'newPapers',
      title: 'New Papers in Your Interests',
      description: 'Get notified when new papers are published in your research areas',
      icon: 'FileText'
    },
    {
      key: 'authorUpdates',
      title: 'Followed Authors',
      description: 'Updates when authors you follow publish new papers',
      icon: 'Users'
    },
    {
      key: 'categoryUpdates',
      title: 'Category Highlights',
      description: 'Important papers and trends in your selected categories',
      icon: 'TrendingUp'
    },
    {
      key: 'recommendations',
      title: 'Personalized Recommendations',
      description: 'AI-curated paper suggestions based on your interests',
      icon: 'Sparkles'
    },
    {
      key: 'systemUpdates',
      title: 'System Updates',
      description: 'Platform updates, maintenance notifications, and new features',
      icon: 'Settings'
    },
    {
      key: 'newsletter',
      title: 'Research Newsletter',
      description: 'Monthly digest of research trends and platform highlights',
      icon: 'Mail'
    }
  ];

  const frequencyOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const dayOptions = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' }
  ];

  return (
    <div className="space-y-8">
      {/* Email Notifications */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Email Notifications</h3>
        <p className="text-text-secondary text-sm mb-6">
          Choose what email notifications you'd like to receive and how often.
        </p>
        
        <div className="space-y-6">
          {notificationTypes.map((type) => (
            <div key={type.key} className="border border-border rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={type.icon} size={20} className="text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-text-primary">{type.title}</h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailNotifications[type.key].enabled}
                        onChange={(e) => handleEmailNotificationChange(type.key, 'enabled', e.target.checked)}
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
                  
                  <p className="text-text-secondary text-sm mb-3">{type.description}</p>
                  
                  {emailNotifications[type.key].enabled && (
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-text-muted">Frequency:</span>
                      <select
                        value={emailNotifications[type.key].frequency}
                        onChange={(e) => handleEmailNotificationChange(type.key, 'frequency', e.target.value)}
                        className="px-3 py-1 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {frequencyOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Push Notifications</h3>
        <p className="text-text-secondary text-sm mb-6">
          Configure real-time notifications for different devices and platforms.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Globe" size={20} className="text-text-muted" />
              <div>
                <h4 className="font-medium text-text-primary">Browser Notifications</h4>
                <p className="text-text-secondary text-sm">Receive notifications in your web browser</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={pushNotifications.browserNotifications}
                onChange={(e) => handlePushNotificationChange('browserNotifications', e.target.checked)}
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
            <div className="flex items-center space-x-3">
              <Icon name="Smartphone" size={20} className="text-text-muted" />
              <div>
                <h4 className="font-medium text-text-primary">Mobile Notifications</h4>
                <p className="text-text-secondary text-sm">Push notifications on mobile devices</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={pushNotifications.mobileNotifications}
                onChange={(e) => handlePushNotificationChange('mobileNotifications', e.target.checked)}
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
            <div className="flex items-center space-x-3">
              <Icon name="Monitor" size={20} className="text-text-muted" />
              <div>
                <h4 className="font-medium text-text-primary">Desktop Notifications</h4>
                <p className="text-text-secondary text-sm">System notifications on desktop</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={pushNotifications.desktopNotifications}
                onChange={(e) => handlePushNotificationChange('desktopNotifications', e.target.checked)}
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
        </div>
      </div>

      {/* Research Digest */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Research Digest</h3>
        <p className="text-text-secondary text-sm mb-6">
          Configure your personalized research digest with curated content.
        </p>
        
        <div className="border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-medium text-text-primary">Enable Research Digest</h4>
              <p className="text-text-secondary text-sm">Receive a curated summary of research papers</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={digestSettings.enabled}
                onChange={(e) => handleDigestSettingChange('enabled', e.target.checked)}
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

          {digestSettings.enabled && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Frequency
                  </label>
                  <select
                    value={digestSettings.frequency}
                    onChange={(e) => handleDigestSettingChange('frequency', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                {digestSettings.frequency === 'weekly' && (
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Day of Week
                    </label>
                    <select
                      value={digestSettings.day}
                      onChange={(e) => handleDigestSettingChange('day', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {dayOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Delivery Time
                  </label>
                  <input
                    type="time"
                    value={digestSettings.time}
                    onChange={(e) => handleDigestSettingChange('time', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Maximum Papers
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    value={digestSettings.maxPapers}
                    onChange={(e) => handleDigestSettingChange('maxPapers', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Include in Digest
                </label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={digestSettings.includeRecommendations}
                      onChange={(e) => handleDigestSettingChange('includeRecommendations', e.target.checked)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-text-secondary">Personalized recommendations</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={digestSettings.includeTrending}
                      onChange={(e) => handleDigestSettingChange('includeTrending', e.target.checked)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-text-secondary">Trending papers</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={digestSettings.includeBookmarks}
                      onChange={(e) => handleDigestSettingChange('includeBookmarks', e.target.checked)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-text-secondary">Updates on bookmarked papers</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quiet Hours */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quiet Hours</h3>
        <p className="text-text-secondary text-sm mb-6">
          Set times when you don't want to receive notifications.
        </p>
        
        <div className="border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-medium text-text-primary">Enable Quiet Hours</h4>
              <p className="text-text-secondary text-sm">Pause notifications during specified hours</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={quietHours.enabled}
                onChange={(e) => handleQuietHoursChange('enabled', e.target.checked)}
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

          {quietHours.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={quietHours.startTime}
                  onChange={(e) => handleQuietHoursChange('startTime', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={quietHours.endTime}
                  onChange={(e) => handleQuietHoursChange('endTime', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Timezone
                </label>
                <select
                  value={quietHours.timezone}
                  onChange={(e) => handleQuietHoursChange('timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;