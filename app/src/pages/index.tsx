import { ActionIcon, Button, Center, Container, createStyles, Flex, Grid, useMantineColorScheme } from '@mantine/core'
import { AppShell, Navbar, Header } from '@mantine/core'
import { GlobalHeader } from '@/components/global_header'
import { GraphView } from '@/components/markmap_editor/graph/graph_view'
import { TextEditor } from '@/components/markmap_editor/text_editor'

const useStyles = createStyles((theme) => ({
  mainView: {
    split: {
    marginLeft: 60,
    marginRight: 60,
    [`@media (max-width: ${theme.breakpoints.xl}px) and (min-width: ${theme.breakpoints.md}px)`]: {
      marginLeft: 0,
      marginRight: 0
    },
  },

    tab: {
      display: 'none'
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      tab: {
        display: 'none'
      }
    },
  }
}))

export default function Home() {
  const { classes } = useStyles()

  return (
    <>
      <AppShell
        padding='xl'
        header={<GlobalHeader />}
      >
        <Grid gutter={40} justify="center" align="space-around" className={classes.mainView}>
          <Grid.Col span={6}>
            <TextEditor />
          </Grid.Col>
          <Grid.Col span={6}>
            <GraphView />
          </Grid.Col>
        </Grid>
      </AppShell>
    </>
  )
}
