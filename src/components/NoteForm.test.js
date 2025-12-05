import React from 'react'
import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = jest.fn()
  render(<NoteForm createNote={createNote} />)

  const input = screen.getByPlaceholderText('write note content here')
  const button = screen.getByText('save')

  await userEvent.type(input, 'testing a form...')
  await userEvent.click(button)

  expect(createNote).toHaveBeenCalledTimes(1)
  expect(createNote).toHaveBeenCalledWith(
    expect.objectContaining({
      content: 'testing a form...',
      important: true
    })
  )
})