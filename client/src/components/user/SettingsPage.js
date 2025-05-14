import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/shared/Navbar';

const PageContainer = styled.div`
  margin-top: 80px; // Account for fixed navbar
  padding: 5rem;
  min-height: calc(100vh - 80px);
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  font-size: 2rem;
  text-align: center;
`;

const SettingsSection = styled.section`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.background};
  padding-bottom: 0.75rem;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem 0;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  font-weight: 600;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.text}99;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

const Select = styled.select`
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.background};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.primary};
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

// Add more setting controls like ToggleSwitch, etc. if needed

const SettingsPage = () => {
  // State for accessibility settings
  const [colorblindMode, setColorblindMode] = useState('none'); // Default: 'none'

  // Add state for other settings later (e.g., theme, notifications)

  const handleColorblindModeChange = (e) => {
    const newMode = e.target.value;
    setColorblindMode(newMode);
    // TODO: Apply the colorblind mode logic globally
    console.log('Colorblind mode changed to:', newMode);
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <Title>Settings</Title>

        <SettingsSection>
          <SectionTitle>Accessibility</SectionTitle>
          <SettingItem>
            <div>
              <Label htmlFor="colorblind-mode">Colorblind Mode</Label>
              <Description>Adjust colors for better visibility.</Description>
            </div>
            <Select
              id="colorblind-mode"
              value={colorblindMode}
              onChange={handleColorblindModeChange}
            >
              <option value="none">None</option>
              <option value="protanopia">Protanopia (Red-Blind)</option>
              <option value="deuteranopia">Deuteranopia (Green-Blind)</option>
              <option value="tritanopia">Tritanopia (Blue-Blind)</option>
            </Select>
          </SettingItem>
          {/* Add more accessibility settings here if needed */}
        </SettingsSection>

        {/* Removed Account and Notifications sections */}

      </PageContainer>
    </>
  );
};

export default SettingsPage; 