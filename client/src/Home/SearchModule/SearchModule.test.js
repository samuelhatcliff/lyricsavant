import { fireEvent, render } from '@testing-library/react';
import SearchModule from './SearchModule';
import '@testing-library/jest-dom/extend-expect'


test('it renders without crashing', () => {
    render(<SearchModule />);
})

test('checkbox toggles between 1 and 2 search bars', () => {
    const { getByPlaceholderText } = render(<SearchModule />);
    const checkbox = getByPlaceholderText(`checkbox`);
    fireEvent.click(checkbox);
    const secondSearch = getByPlaceholderText(`checkbox`);
    expect(secondSearch).toBeInTheDocument();
})