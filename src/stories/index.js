import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Welcome } from '@storybook/react/demo'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import Input from '../components/Input'

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
))

storiesOf('Button', module).add('Normal button', () => (
  <Button onClick={action('Button clicked')}>This is a button</Button>
))

storiesOf('Checkbox', module).add('Normal Checkbox', () => (
  <Checkbox>This is a checkbox</Checkbox>
))

storiesOf('Input', module).add('Normal Input', () => <Input />)
