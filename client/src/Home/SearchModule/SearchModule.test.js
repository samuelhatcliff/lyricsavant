import { render } from '@testing-library/react';
import SearchModule from './SearchModule';



test('it renders without crashing', () => {
    render(<SearchModule />);
})

test('demo', () => {
    const { getByPlaceholderText } = render(<SearchModule />);
    console.log(getByPlaceholderText(`checkbox`))
})