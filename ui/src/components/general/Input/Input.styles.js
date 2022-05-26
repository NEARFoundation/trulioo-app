import { makeStyles } from '@mui/styles';

const styles = (theme) => ({
  input: {
    '& .MuiFilledInput-root': {
      borderRadius: theme.spacing(1.5),
      borderBottom: 0,
      '& input': {
        paddingTop: theme.spacing(2),
        paddingRight: theme.spacing(4),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2),
      },
    },
  },
});

export const useStyles = makeStyles(styles, { name: 'Input' });
