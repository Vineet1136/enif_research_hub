import React, { useState } from 'react';
import Icon from 'components/AppIcon';

import ProfileInformation from './components/ProfileInformation';
import ResearchInterests from './components/ResearchInterests';
import NotificationPreferences from './components/NotificationPreferences';
import AccountSecurity from './components/AccountSecurity';

const UserProfileAndResearchPreferences = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    {
      id: 'profile',
      label: 'Profile Information',
      icon: 'User',
      description: 'Personal details and academic credentials'
    },
    {
      id: 'research',
      label: 'Research Interests',
      icon: 'BookOpen',
      description: 'Customize your research preferences'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Manage alerts and updates'
    },
    {
      id: 'security',
      label: 'Account Security',
      icon: 'Shield',
      description: 'Password and security settings'
    }
  ];

  const handleSaveChanges = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileInformation />;
      case 'research':
        return <ResearchInterests />;
      case 'notifications':
        return <NotificationPreferences />;
      case 'security':
        return <AccountSecurity />;
      default:
        return <ProfileInformation />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-heading font-semibold text-text-primary mb-2">
                Profile & Research Preferences
              </h1>
              <p className="text-text-secondary">
                Customize your research experience and manage account settings
              </p>
            </div>
            <button
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed nav-transition"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Icon name="Save" size={18} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Tabs Sidebar */}
          <div className="hidden lg:block">
            <div className="bg-background border border-border rounded-lg p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-start space-x-3 p-3 rounded-lg text-left nav-transition ${
                      activeTab === tab.id
                        ? 'bg-primary text-white' :'text-text-secondary hover:bg-surface hover:text-text-primary'
                    }`}
                  >
                    <Icon 
                      name={tab.icon} 
                      size={20} 
                      className={activeTab === tab.id ? 'text-white mt-0.5' : 'text-text-muted mt-0.5'}
                    />
                    <div>
                      <div className={`font-medium ${activeTab === tab.id ? 'text-white' : 'text-text-primary'}`}>
                        {tab.label}
                      </div>
                      <div className={`text-sm mt-1 ${
                        activeTab === tab.id ? 'text-blue-100' : 'text-text-muted'
                      }`}>
                        {tab.description}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Mobile/Tablet Tabs */}
          <div className="lg:hidden col-span-1">
            <div className="bg-background border border-border rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center space-y-2 p-3 rounded-lg nav-transition ${
                      activeTab === tab.id
                        ? 'bg-primary text-white' :'text-text-secondary hover:bg-surface hover:text-text-primary'
                    }`}
                  >
                    <Icon 
                      name={tab.icon} 
                      size={20} 
                      className={activeTab === tab.id ? 'text-white' : 'text-text-muted'}
                    />
                    <span className={`text-sm font-medium text-center ${
                      activeTab === tab.id ? 'text-white' : 'text-text-primary'
                    }`}>
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-background border border-border rounded-lg">
              {/* Tab Header */}
              <div className="border-b border-border p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={tabs.find(tab => tab.id === activeTab)?.icon} 
                      size={20} 
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-semibold text-text-primary">
                      {tabs.find(tab => tab.id === activeTab)?.label}
                    </h2>
                    <p className="text-text-secondary text-sm">
                      {tabs.find(tab => tab.id === activeTab)?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileAndResearchPreferences;