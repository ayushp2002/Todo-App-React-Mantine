import { createStyles, Progress, Text, Group, Popover, Box, SimpleGrid, Menu, ActionIcon } from '@mantine/core';
import { IconChartLine, IconTrash, IconDots, IconForms } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  progressLabel: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    fontSize: theme.fontSizes.sm,
  },
  stat: {
    borderBottom: '3px solid',
    paddingBottom: 5,
  },

  statCount: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.3,
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[5],
  },
}));

export function StatsSegments({ listName, total, data, listBadges }) {
  const { classes } = useStyles();

  const segments = data.map((segment) => ({
    value: segment.part,
    color: segment.color,
    label: segment.part > 10 ? `${segment.part}%` : undefined,
  }));

  const descriptions = data.map((stat) => (
    <Box key={stat.label} sx={{ borderBottomColor: stat.color }} className={classes.stat}>
      <Text transform="uppercase" size="xs" color="dimmed" weight={700}>
        {stat.label}
      </Text>

      <Group position="apart" align="flex-end" spacing={0}>
        <Text weight={700}>{stat.count}</Text>
        <Text color={stat.color} weight={700} size="sm" className={classes.statCount}>
          {stat.part}%
        </Text>
      </Group>
    </Box>
  ));

  return (
    <Group mt="md" position="apart" sx={{ flexWrap: 'nowrap' }}>
      <Group sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }} spacing="xs">
        <Text sx={{ fontSize: 30 }} weight={700}>{listName}</Text>
      </Group>
      <Group>
      <Popover shadow="lg" width={300} opendelay={200} >
        <Popover.Target>
          <ActionIcon variant="outline">
            <IconChartLine cursor='pointer' size={20} className={classes.icon} stroke={1.5} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>
          <div>
            <Text size="xl" weight={700}>{total}</Text>
            {listBadges}
            <Progress mt="sm" sections={segments} size={35} classNames={{ label: classes.progressLabel }} />
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'xs', cols: 1 }]} mt="xl">
              {descriptions}
            </SimpleGrid>
          </div>
        </Popover.Dropdown>
      </Popover>
      <Menu shadow="md" position="top" opendelay={100} width={200}>
        <Menu.Target>
          <ActionIcon variant='outline' color="blue">
            <IconDots size={18} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>List Actions</Menu.Label>
          <Menu.Item icon={<IconForms size={14} />}>Rename List</Menu.Item>
          <Menu.Divider />
          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item color="red" icon={<IconTrash size={14} />}>Delete list</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      </Group>
    </Group>
  );
}