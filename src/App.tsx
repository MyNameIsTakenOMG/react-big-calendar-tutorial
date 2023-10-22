import { useState } from 'react';
import {
  BasicCalendar,
  ControlCalendar,
  CustomizingCalendar,
  AdvancedCalendar,
} from './Components';
import DayjsCalendar from './Components/DayjsCalendar/DayjsCalendar';

function App() {
  return (
    <div style={{ height: '95vh' }}>
      {/* <BasicCalendar /> */}
      {/* <ControlCalendar /> */}
      {/* <CustomizingCalendar /> */}
      {/* <AdvancedCalendar /> */}
      <DayjsCalendar />
    </div>
  );
}

export default App;
