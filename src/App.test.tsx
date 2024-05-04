import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import App from './App'

const links = ["Vite logo", "React logo"]

render(<App />)

test('home page counter', async () => {


    const countButton = screen.getByRole('button', { name: /count/i })

    expect(countButton).not.toBeNull()

    await userEvent.click(countButton)

    expect(screen.getByText(/count is 1/i)).not.toBeNull()

    await userEvent.click(countButton)
    await userEvent.click(countButton)

    expect(screen.getByText(/count is 3/i)).not.toBeNull()
})

test.each(links)('should have a link to %s', (linkText) => {

    const link = screen.getByAltText(linkText)
    expect(link).not.toBeNull()
})