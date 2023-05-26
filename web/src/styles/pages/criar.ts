import { styled } from '../'
import welcome from '../../assets/img/welcome.png'

export const Main = styled('main', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',

  '@media screen and (min-width: 768px)': {
    backgroundImage: `url(${welcome.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    alignItems: 'center',
    justifyContent: 'right',
  },

  p: {
    margin: 0
  },

  '.formContainer': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',

    marginRight: '10rem',

    borderRadius: '0.5rem',
    boxShadow: '0px 0.75rem 1rem rgba(0, 0, 0, 0.15)',

    backgroundColor: 'white',

    maxWidth: '20rem',

    '@media screen and (max-width: 1000px)': {
      marginRight: '5rem',
    },

    '@media screen and (max-width: 768px)': {
      border: 0,
      marginRight: 0,
      boxShadow: 'none',
    },

    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',

      width: '100%',

      '.nameContainer': {
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem',
        width: 'auto',

        input: {
          minWidth: '0'
        }
      },

      '.typeContainer': {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
      },

      '.radioContainer': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.25rem',
      },

      '.buttonContainer': {
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem',
        marginTop: '0.25rem',

        button: {
          width: '100%',
          fontWeight: 500,

          '&.createAccount': {
            backgroundColor: '$green_600',
            color: '$white'
          }
        }
      }
    }
  }
});

export const Logo = styled('h2', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
  fontFamily: 'Inter',
  fontWeight: '600',
  color: '$green_700',
  fontSize: '1.5rem',
  margin: '0.5rem 0',
  cursor: 'pointer',

  span: {
    color: '$green_700',

    '@media screen and (max-width: 720px)': {
      fontSize: '1.125rem',
    },
  }
});