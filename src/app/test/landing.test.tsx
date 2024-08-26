import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Landing from '../views/Landing'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<Landing />)

 
    expect("All GPTs").toBeInTheDocument()
  })
})