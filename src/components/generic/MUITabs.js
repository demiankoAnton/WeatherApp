import { memo, useState, useCallback } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

const MUITabs = memo(({ tabsContent }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const onClickTabChange = useCallback((_, value) => {
    setCurrentTab(value);
  }, []);

  return (
    <Box sx={{position: "relative"}}>
      <Box mt={2}>
        <Tabs
          value={currentTab}
          aria-label="basic tabs"
          onChange={onClickTabChange}
        >
          {tabsContent.map(({ label }, index) =>
            <Tab
              sx={{borderBottom: 1, borderColor: 'text.secondary'}}
              key={`tab_${label}_${index}`}
              label={label}
              value={index}
            />
          )}
        </Tabs>
      </Box>
      {tabsContent.map(({ label, content }, index) =>
        <TabPanel
          key={`tab_panel_${label}_${index}`}
          value={currentTab}
          label={label} index={index}
        >
          {content}
        </TabPanel>
      )}
    </Box>
  );
});

function TabPanel({ children, value, index } ) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box sx={{pt: 3}}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default MUITabs;


