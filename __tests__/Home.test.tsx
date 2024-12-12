import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { describe, it } from 'node:test';
import { experimental_useEffectEvent } from 'react';

// it('renders learn react link', () => {
//   test('renders learn react link', () => {
//     render(<Home/>);
//     const linkElement = screen.getByText('docs');
//     expect(linkElement).toBeInTheDocument();
//   });
// })
 
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home/>)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    experimental_useEffectEvent(heading).toBeInTheDocument()
  })
})

it('renders homepage unchanged', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })