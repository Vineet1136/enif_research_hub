import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NavigationStateManager from "components/ui/NavigationStateManager";
import HeaderNavigation from "components/ui/HeaderNavigation";
import SidebarNavigation from "components/ui/SidebarNavigation";
import BreadcrumbNavigation from "components/ui/BreadcrumbNavigation";
import { useNavigation } from "components/ui/NavigationStateManager";

// Page imports
import ResearchPaperDiscoveryDashboard from "pages/research-paper-discovery-dashboard";
import DetailedPaperAnalysisView from "pages/detailed-paper-analysis-view";
import AdvancedSearchAndFilterInterface from "pages/advanced-search-and-filter-interface";
import UserProfileAndResearchPreferences from "pages/user-profile-and-research-preferences";
import PaperComparisonAndAnalysisTools from "pages/paper-comparison-and-analysis-tools";

const AppLayout = ({ children }) => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useNavigation();

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation 
        onMenuToggle={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <SidebarNavigation 
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />
      <main className={`
        min-h-screen pt-16 content-transition
        ${isSidebarOpen ? 'lg:ml-60' : 'lg:ml-60'}
      `}>
        <div className="p-4 lg:p-6">
          <BreadcrumbNavigation />
          {children}
        </div>
      </main>
    </div>
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <NavigationStateManager>
          <ScrollToTop />
          <RouterRoutes>
            <Route path="/" element={
              <AppLayout>
                <ResearchPaperDiscoveryDashboard />
              </AppLayout>
            } />
            <Route path="/research-paper-discovery-dashboard" element={
              <AppLayout>
                <ResearchPaperDiscoveryDashboard />
              </AppLayout>
            } />
            <Route path="/detailed-paper-analysis-view" element={
              <AppLayout>
                <DetailedPaperAnalysisView />
              </AppLayout>
            } />
            <Route path="/advanced-search-and-filter-interface" element={
              <AppLayout>
                <AdvancedSearchAndFilterInterface />
              </AppLayout>
            } />
            <Route path="/user-profile-and-research-preferences" element={
              <AppLayout>
                <UserProfileAndResearchPreferences />
              </AppLayout>
            } />
            <Route path="/paper-comparison-and-analysis-tools" element={
              <AppLayout>
                <PaperComparisonAndAnalysisTools />
              </AppLayout>
            } />
          </RouterRoutes>
        </NavigationStateManager>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;