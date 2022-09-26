import { createStyles, Group, Checkbox, ScrollArea, Text, Stack, Paper, Badge } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  row: {
    backgroundColor: theme.colors.gray[1],
    margin: "10px 15px 10px 0px",
    '&:hover': {
      backgroundColor: theme.colors.gray[2]
    }
  }
}));

export function TableSelection(props) {
  const { classes } = useStyles();

  const rows = props.data.map((item) => {
    return (
      <Paper shadow="xs" p="sm" className={classes.row} key={item.id} onClick={() => {props.openItemDialog(item.task.id)}}>
        <Group noWrap>
          <Checkbox
            defaultChecked={item.task.completed}
          />
          <Stack spacing="xs">
            <Group>
            {props.list === "All" ? <Badge>{item.list}</Badge> : ""}
            <Text size="sm" weight={500}>
              {item.task.title}
            </Text>
            </Group>
            <Text size="xs" weight={300}>
              {item.task.desc}
            </Text>
          </Stack>
        </Group>
      </Paper>
    );
  });

  return (
    <ScrollArea sx={{ flexGrow: 1, width: '100%' }}>
      {rows}
    </ScrollArea>
  );
}