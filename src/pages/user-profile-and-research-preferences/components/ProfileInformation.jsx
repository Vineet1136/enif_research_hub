import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ProfileInformation = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@university.edu',
    institution: 'Stanford University',
    department: 'Computer Science',
    position: 'Associate Professor',
    orcidId: '0000-0002-1825-0097',
    researchFocus: 'Machine Learning, Natural Language Processing',
    biography: `Dr. Sarah Johnson is an Associate Professor in the Computer Science Department at Stanford University. Her research focuses on machine learning applications in natural language processing, with particular emphasis on developing AI systems that can understand and generate human language more effectively.

She has published over 50 peer-reviewed papers in top-tier conferences and journals, and her work has been cited over 3,000 times. Dr. Johnson is also actively involved in mentoring graduate students and promoting diversity in STEM fields.`,
    website: 'https://cs.stanford.edu/~sjohnson',
    googleScholar: 'https://scholar.google.com/citations?user=abc123',
    linkedIn: 'https://linkedin.com/in/dr-sarah-johnson'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!profileData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!profileData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!profileData.institution.trim()) {
      newErrors.institution = 'Institution is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setIsEditing(false);
      // Here you would typically save to backend
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Reset form data if needed
  };

  return (
    <div className="space-y-8">
      {/* Profile Picture Section */}
      <div className="flex items-start space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              alt="Profile Picture"
              className="w-full h-full object-cover"
            />
          </div>
          {isEditing && (
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-white rounded-full 
                             flex items-center justify-center hover:bg-primary-700 nav-transition">
              <Icon name="Camera" size={16} />
            </button>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-2">Profile Picture</h3>
          <p className="text-text-secondary text-sm mb-4">
            Upload a professional photo that represents you in the academic community.
          </p>
          {isEditing && (
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-surface nav-transition">
                Upload New Photo
              </button>
              <button className="px-4 py-2 text-error hover:bg-error-light rounded-lg nav-transition">
                Remove Photo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Basic Information</h3>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 text-primary hover:bg-primary-50 rounded-lg nav-transition"
            >
              <Icon name="Edit" size={16} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-border rounded-lg hover:bg-surface nav-transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              First Name *
            </label>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                           focus:ring-primary focus:border-transparent ${
                    errors.firstName ? 'border-error' : 'border-border'
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-error text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
            ) : (
              <p className="text-text-secondary">{profileData.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Last Name *
            </label>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                           focus:ring-primary focus:border-transparent ${
                    errors.lastName ? 'border-error' : 'border-border'
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-error text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            ) : (
              <p className="text-text-secondary">{profileData.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address *
            </label>
            {isEditing ? (
              <div>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                           focus:ring-primary focus:border-transparent ${
                    errors.email ? 'border-error' : 'border-border'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">{errors.email}</p>
                )}
              </div>
            ) : (
              <p className="text-text-secondary">{profileData.email}</p>
            )}
          </div>

          {/* Institution */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Institution *
            </label>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={profileData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                           focus:ring-primary focus:border-transparent ${
                    errors.institution ? 'border-error' : 'border-border'
                  }`}
                  placeholder="Enter your institution"
                />
                {errors.institution && (
                  <p className="text-error text-sm mt-1">{errors.institution}</p>
                )}
              </div>
            ) : (
              <p className="text-text-secondary">{profileData.institution}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Department
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your department"
              />
            ) : (
              <p className="text-text-secondary">{profileData.department}</p>
            )}
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Position
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your position"
              />
            ) : (
              <p className="text-text-secondary">{profileData.position}</p>
            )}
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-6">Academic Information</h3>
        
        <div className="space-y-6">
          {/* ORCID ID */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              ORCID ID
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.orcidId}
                onChange={(e) => handleInputChange('orcidId', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="0000-0000-0000-0000"
              />
            ) : (
              <p className="text-text-secondary">{profileData.orcidId}</p>
            )}
          </div>

          {/* Research Focus */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Research Focus Areas
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.researchFocus}
                onChange={(e) => handleInputChange('researchFocus', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your research focus areas"
              />
            ) : (
              <p className="text-text-secondary">{profileData.researchFocus}</p>
            )}
          </div>

          {/* Biography */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Biography
            </label>
            {isEditing ? (
              <textarea
                value={profileData.biography}
                onChange={(e) => handleInputChange('biography', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Tell us about your academic background and research interests..."
              />
            ) : (
              <div className="text-text-secondary whitespace-pre-line">
                {profileData.biography}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-6">Professional Links</h3>
        
        <div className="space-y-4">
          {/* Website */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center">
              <Icon name="Globe" size={20} className="text-text-muted" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-text-primary mb-1">
                Personal Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={profileData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://your-website.com"
                />
              ) : (
                <a 
                  href={profileData.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-700 nav-transition"
                >
                  {profileData.website}
                </a>
              )}
            </div>
          </div>

          {/* Google Scholar */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} className="text-text-muted" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-text-primary mb-1">
                Google Scholar
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={profileData.googleScholar}
                  onChange={(e) => handleInputChange('googleScholar', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://scholar.google.com/citations?user=..."
                />
              ) : (
                <a 
                  href={profileData.googleScholar} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-700 nav-transition"
                >
                  View Google Scholar Profile
                </a>
              )}
            </div>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center">
              <Icon name="Linkedin" size={20} className="text-text-muted" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-text-primary mb-1">
                LinkedIn
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={profileData.linkedIn}
                  onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://linkedin.com/in/..."
                />
              ) : (
                <a 
                  href={profileData.linkedIn} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-700 nav-transition"
                >
                  View LinkedIn Profile
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;