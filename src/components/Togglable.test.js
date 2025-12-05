import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'  // ← importe o componente certo

describe('<Togglable />', () => {
  test('toggled content can be closed', async () => {
    const { container } = render(  // ← desestruture container aqui
      <Togglable buttonLabel="show...">  // ← passe buttonLabel explicitamente
        <div>Test content</div>  // ← adicione children para testar
      </Togglable>
    )

    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})