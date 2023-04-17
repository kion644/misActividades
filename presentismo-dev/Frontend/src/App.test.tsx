import { render, screen } from '@testing-library/react';
import App from './App';
import StaticContext from './hooks/UseContext/Solicitudes';

test('renders learn react link', () => {
  render(
  
      <StaticContext.Provider value={{
        solicitudes: 0,
        bitas: 0
      }}>
        <App />
      </StaticContext.Provider>
);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
