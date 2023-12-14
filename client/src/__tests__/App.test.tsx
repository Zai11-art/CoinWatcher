// src/__ tests __/App.test.tsx

import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import { WrappedApp } from '../main'

test('demo', () => {
    expect(true).toBe(true)
})

test("Renders the main page", () => {
    render(<WrappedApp />)
    expect(true).toBeTruthy()
})