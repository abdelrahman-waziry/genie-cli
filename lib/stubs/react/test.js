module.exports = function (name) {
    return `import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ${name} from './${name}'

describe('${name}', () => {
  it('renders successfully', () => {
    render(<${name} />)
    expect(screen.getByText('${name}')).toBeInTheDocument()
  })

  it('renders with correct structure', () => {
    const { container } = render(<${name} />)
    expect(container.firstChild).toHaveClass('${name.toLowerCase()}')
  })

  // Add more tests here
})
`;
};
