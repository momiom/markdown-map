import { useState } from 'react'
import {
  createStyles,
  Header,
  Group,
  ActionIcon,
  Container,
  Burger,
  Flex,
  Center,
  useMantineColorScheme,
} from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons'

export function GlobalHeader() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Header height={56} p='xl' withBorder={false}>
      <Flex h='100%' justify='space-between' align='center' gap='md' mx='auto'>
        <strong>Markdown Map</strong>
        <Group spacing={0} position='right' noWrap>
          <ActionIcon
            variant='outline'
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title='Toggle color scheme'
          >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
        </Group>
      </Flex>
    </Header>
  )
}
