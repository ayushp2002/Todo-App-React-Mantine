import {
    UnstyledButton,
    Group,
    Avatar,
    Text,
    createStyles,
  } from '@mantine/core';
  import { IconChevronRight } from '@tabler/icons';
  
  const useStyles = createStyles((theme) => ({
    user: {
      display: 'block',
      width: '100%',
      padding: theme.spacing.md,
    },
    group: {
      padding: '5px',
      borderRadius: theme.radius.sm,
      display: 'flex',
      flexWrap: 'nowrap',
      '&:hover': {
        backgroundColor: theme.fn.lighten('#228be6', 0.1),
      },
    }
  }));
  
  export function UserButton({ image, name, email, icon, ...others }) {
    const { classes } = useStyles();
  
    return (
      <UnstyledButton className={classes.user} {...others}>
        <Group className={classes.group}>
          <Avatar src={image} radius="xl" />
  
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500} color="white">
              {name}
            </Text>
  
            <Text color="white" size="xs">
              {email}
            </Text>
          </div>
  
          {icon || <IconChevronRight size={14} stroke={1.5} color="white" />}
        </Group>
      </UnstyledButton>
    );
  }