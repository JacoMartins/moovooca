import * as Accordion from '@radix-ui/react-accordion';
import { keyframes, styled } from "..";

export const BodyContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '20% 80%',
  textAlign: 'left',
  width: '100%',
  maxWidth: '68rem',

  '.profileSidebar': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    padding: '1.5rem 0',

    '.profileContainer': {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },

    '.textContainer': {
      h2: {
        lineHeight: 'normal',
        margin: 0
      },
      span: {
        color: 'rgba(0, 0, 0, 0.5)'
      }
    }
  },

  '.mainContainer': {
    padding: '1.5rem 0',

    '.profileNav': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      height: '4.25rem',
      padding: '0 2rem',
      backgroundColor: 'transparent',
      borderBottom: 'solid 1px rgba(0, 0, 0, 0.15)',

      '.profileNavContainer': {
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem',
        width: '100%',
      }
    }
  },

  '.locationContainer': {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.25rem',
    alignItems: 'center'
  },

  '.lineTriggerContainer': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: '0.5rem',
    fontSize: '1.125rem',

    '@media screen and (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'left',
      alignItems: 'flex-start',
      width: '100%',
    },

    '.firstContainer': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'left',
      alignItems: 'center',
      gap: '0.5rem',

      fontSize: '1rem',
      
      '.busTitleContainer': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        textAlign: 'left',
        gap: '0.375rem',
        
        'span:last-child': {
          fontWeight: 600,
          letterSpacing: '-0.25px',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
        }
      },

      '.busCode': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.25rem',
        color: 'rgba(0, 0, 0, 0.8)',
        fontSize: '1.125rem',
        fontWeight: 600,
        borderRight: 'solid 1px $black_200',
        padding: '0 0.5rem 0 0',

        width: '3.5rem',
      },

      '@media screen and (max-width: 768px)': {
        justifyContent: 'left',
        alignItems: 'flex-start',
        textAlign: 'left',
        lineHeight: '100%',
        gap: '0.5rem',
      },
    },

    '.lastContainer': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '1rem',
      justifyContent: 'right',

      '.infoTextContainer': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'right',
        alignItems: 'right',
        textAlign: 'right',
        lineHeight: '100%',

        gap: '0',

        fontSize: '0.875rem',

        span: {
          fontWeight: 600,
        },

        '@media screen and (max-width: 768px)': {
          justifyContent: 'left',
          alignItems: 'flex-start',
          textAlign: 'left',
          lineHeight: '100%',
          gap: '0.25rem',
        },
      }
    },
  },

  '.contentContainer': {
    padding: '0.5rem'
  }
})

export const ProfileNavButton = styled('button', {
  display: 'flex',
  flexDirection: 'row',
  gap: '0.375rem',
  alignItems: 'center',
  background: 'transparent',
  padding: '0.625rem 0.5rem',
  borderBottom: 'solid 2px transparent',
  borderRadius: '0',

  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  },

  '&:active': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)'
  },

  variants: {
    selected: {
      true: {
        fontWeight: 600,
        borderBottom: 'solid 2px $green_600'
      },

      false: {
        fontWeight: 400,
        borderBottom: 'solid 0px $green_600'
      }
    }
  }
})

export const AccordionRoot = styled(Accordion.Root, {
  borderRadius: 6,
  width: 300,
  backgroundColor: 'white',
  boxShadow: `0 2px 10px rgba(0, 0, 0, 0.5)`,
});

export const AccordionItem = styled(Accordion.Item, {
  overflow: 'hidden',
  marginTop: 1,

  '&:first-child': {
    marginTop: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  '&:last-child': {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  '&:focus-within': {
    position: 'relative',
    zIndex: 1,
    boxShadow: `0 0 0 2px rgba(0, 0, 0, 0.15)`,
  },
});


export const StyledHeader = styled(Accordion.Header, {
  all: 'unset',
  display: 'flex',
});

export const StyledTrigger = styled(Accordion.Trigger, {
  all: 'unset',
  fontFamily: 'inherit',
  padding: '0 20px',
  height: 45,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 15,
  lineHeight: 1,
  color: '',
  boxShadow: `0 1px 0 ''`,
  backgroundColor: 'white',
  '&:hover': { backgroundColor: '' },
});

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
});

export const StyledContent = styled(Accordion.Content, {
  overflow: 'hidden',
  fontSize: 15,
  color: '',
  backgroundColor: '',

  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});

export const StyledContentText = styled('div', {
  padding: '15px 20px',
});