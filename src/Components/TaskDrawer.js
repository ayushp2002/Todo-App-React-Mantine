import {
  Checkbox,
  Drawer,
  Group,
  Paper,
  Text,
  createStyles,
  ActionIcon,
  Stack,
  ScrollArea,
  TextInput,
  Menu,
  Textarea
} from "@mantine/core";
import {
  IconDeviceFloppy,
  IconTrash,
  IconX,
  IconVocabulary,
  IconCalendar,
  IconHeart,
  IconDotsVertical,
  IconPlus,
  IconSquare,
  IconNote,
  IconSubtask,
  IconEdit
} from "@tabler/icons";
import { DatePicker } from '@mantine/dates';
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  section: {
    backgroundColor: theme.colors.gray[1],
    margin: "10px 0px",
    padding: theme.spacing.sm,
    '&:hover': {
      backgroundColor: theme.colors.gray[2]
    }
  },
  footer: {
    width: '92%',
    position: "fixed",
    bottom: 0,
    borderTop: 'solid 1px ' + theme.colors.gray[2],
    padding: "10px 0px 16px 0px",
    backgroundColor: "#ffffff"
  },
  top: {
    paddingBottom: "10px",
    borderBottom: 'solid 1px ' + theme.colors.gray[2]
  },
  step: {
    borderBottom: 'solid 1px ' + theme.colors.gray[3],
  },
  overdue: {
    backgroundColor: theme.colors.red[1],
    '&:hover': {
      backgroundColor: theme.colors.red[2]
    }
  }
}));

export function TaskDrawer(props) {
  const { classes } = useStyles();
  const [isEditable, setEditable] = useState(false);

  var steps;

  if (props.task.steps) {
    if (props.task.steps.length > 0) {
      steps = props.task.steps.map((step) => {
        return (
          <Group key={step.id} position="apart" noWrap className={classes.step}>
            <Group noWrap>
              <Checkbox size="xs" defaultChecked={step.completed} />
              <Text size="sm">{step.text}</Text>
            </Group>
            <Menu shadow="md" position="top" opendelay={100} width={200}>
              <Menu.Target>
                <ActionIcon variant="subtle">
                  <IconDotsVertical size={18} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<IconSquare size={14} />}>Mark as pending</Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" icon={<IconTrash size={14} />}>Delete step</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        );
      });
    } else {
      steps = (<Text size="sm" color="grey">No steps added</Text>);
    }
  }

  return (
    <Drawer
      withCloseButton={false}
      opened={props.opened}
      onClose={() => {props.setOpened(false);setEditable(false)}}
      position="right"
      padding="md"
      size="lg"
      overlayOpacity={0.35}
      overlayBlur={0.6}
    >
      <Group position="apart" className={classes.top}>
        <ActionIcon variant="subtle" onClick={() => props.setOpened(false)}><IconX size={20} stroke={1.5} /></ActionIcon>
        <ActionIcon variant="outline" color="#228be6" onClick={() => setEditable(!isEditable)}>
          {isEditable ? <IconDeviceFloppy size={20} stroke={1.5} /> : <IconEdit size={20} stroke={1.5} />}
        </ActionIcon>
      </Group>
      <ScrollArea offsetScrollbars scrollbarSize={10} sx={{ height: "100%", paddingBottom: "70px" }}>
        <Paper className={classes.section}>
          <Group position="apart" noWrap spacing="xs">
            <Group noWrap spacing="xs" sx={{ width: "100%" }}>
              <Checkbox size="md" defaultChecked={props.task.completed} onChange={() => { }} />
              {
                isEditable
                  ? <TextInput size="lg" variant="unstyled" defaultValue={props.task.title} type="text" sx={{ width: "100%" }} />
                  : <Text size='lg' weight={600}>{props.task.title}</Text>
              }
            </Group>
            <ActionIcon variant="transparent">
              <IconHeart size={20} stroke={1.5} fill={props.task.fav ? "pink" : "none"} />
            </ActionIcon>
          </Group>
        </Paper>
        <Paper className={classes.section}>
          <Group noWrap align="center" spacing="xs" sx={{ width: "100%" }}>
            <ActionIcon variant="transparent"><IconVocabulary size={16} stroke={1.5} /></ActionIcon>
            <Stack spacing={0} sx={{ width: "100%" }}>
              <Text size="sm" weight="500">Description</Text>
              {
                isEditable
                  ? <Textarea variant="unstyled" autosize minRows={2} maxRows={4}>{props.task.desc}</Textarea>
                  : <Text size="sm" weight="400">{props.task.desc}</Text>
              }
            </Stack>
          </Group>
        </Paper>
        <Paper className={
          [classes.section, (new Date() - new Date(props.task.duedate) < 0) ? "" : classes.overdue]
        }>
          <Group noWrap align="center" spacing="xs">
            <ActionIcon variant="transparent"><IconCalendar size={16} stroke={1.5} /></ActionIcon>
            <Stack spacing={0} sx={{ width: "100%" }}>
              <Text size="sm" weight="500">
                {(new Date() - new Date(props.task.duedate) < 0) ? "Due" : "Overdue"}
              </Text>
              {
                isEditable
                  ? <DatePicker placeholder="Pick date" defaultValue={new Date(props.task.duedate)} sx={{ width: "100%" }} />
                  : <Text size="sm" weight="400">{props.task.duedate}</Text>
              }
            </Stack>
          </Group>
        </Paper>
        <Paper className={classes.section}>
          <Stack spacing="xs">
            <Group spacing="xs">
              <ActionIcon variant="transparent"><IconSubtask size={16} stroke={1} /></ActionIcon>
              <Text size="sm" weight="500">Steps</Text>
            </Group>
            {steps}
            {
              isEditable
                ? <Group noWrap spacing="xs">
                    <ActionIcon variant="transparent"><IconPlus size={16} stroke={1} /></ActionIcon>
                    <TextInput size="sm" placeholder="Add a step" sx={{ width: "100%" }} />
                  </Group>
                : ""
            }
          </Stack>
        </Paper>
        <Paper className={classes.section}>
          <Group noWrap spacing="xs">
            <ActionIcon variant="transparent"><IconNote size={16} stroke={1} /></ActionIcon>
            <Stack spacing={0} sx={{ width: "100%" }}>
              <Text size="sm" weight="500">Note</Text>
              {
                isEditable
                  ? <Textarea variant="unstyled" autosize minRows={2} maxRows={4} placeholder="Add a note">{props.task.note ? props.task.note : ""}</Textarea>
                  : <Text size="sm" weight="400">{props.task.note ? props.task.note : "No note added"}</Text>
              }

            </Stack>
          </Group>
        </Paper>
      </ScrollArea>
      <div className={classes.footer}>
        <Group position="apart">
          <Text size="sm">
            {props.task.completed ? "Completed on " + props.task.completedon : "Created on " + props.task.createdon}
          </Text>
          <ActionIcon variant="outline" color="red">
            <IconTrash size="20" stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </Drawer>
  );
}
