import { render } from '@testing-library/react';
import App from './App';


//smoke test
it('should render app component without crashing', () => {
    render(<App />);
})

//snapshot test
it('should match snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot()
})