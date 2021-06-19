import { useCallback, useEffect, useState, VFC } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://github.com/masayuki-0319'>
        masayuki-0319 | GitHub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type Props = {
  localPeerName: string;
  setLocalPeerName: (args?: any) => any;
};

export const InputFormLocal: VFC<Props> = ({
  localPeerName,
  setLocalPeerName,
}) => {
  const label = 'あなたの名前';
  const classes = useStyles();

  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isComposed, setIsComposed] = useState(false);

  useEffect(() => {
    const disabled = name === '' ? true : false;
    setDisabled(disabled);
  }, [name]);

  const initializeLocalPeer = useCallback(
    (
      e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLElement>
    ) => {
      console.log(name);
      setLocalPeerName(name);
      e.preventDefault();
    },
    [name, setLocalPeerName]
  );

  if (localPeerName !== '') return <></>;
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          {label}を入力してください
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            autoFocus
            fullWidth
            label={label}
            margin='normal'
            name='name'
            onChange={(e) => setName(e.target.value)}
            onCompositionStart={() => setIsComposed(true)}
            onCompositionEnd={() => setIsComposed(false)}
            onKeyDown={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.value) return;
              if (isComposed) return;
              if (e.key === 'Enter') initializeLocalPeer(e);
            }}
            required
            value={name}
            variant='outlined'
          />
          <Button
            type='submit'
            disabled={disabled}
            fullWidth
            variant='contained'
            color='primary'
            onClick={(e) => initializeLocalPeer(e)}
            className={classes.submit}
          >
            決定
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};