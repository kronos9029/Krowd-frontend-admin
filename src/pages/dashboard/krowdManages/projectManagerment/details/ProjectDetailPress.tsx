import { Box, Card, Container, Divider, Grid, Typography, Link, CardMedia } from '@mui/material';
import { useState } from 'react';

type PressProps = {
  id: string;
  title: string;
  content: string | null;
  link: string | null;
  description: string | null;
};
type PressListProps = {
  press: PressProps[] | undefined;
};
function ProjectDetailPress({ press }: PressListProps) {
  return (
    <>
      {/* Press */}
      <Container maxWidth={false} sx={{ paddingBottom: '5rem' }}>
        <Box mb={7}>
          <Typography textAlign="center" py={1} color={'#666'} variant="h4">
            Bài viết liên quan
          </Typography>
          <Box mx="auto" width={'10%'}>
            <Divider sx={{ my: 1, borderBottomWidth: 'thick', color: 'primary.main' }} />
          </Box>
        </Box>
        <Grid container gap={1} justifyContent={'space-evenly'} maxWidth={'false'}>
          {press &&
            press.map((f, i) => {
              const part = f.description?.split('\\gg20p');
              if (!part) return;
              const newspaperName = part[0];
              const publicDate = part[1].substring(0, 10).trim();
              const newLink = part[2];
              const content = f.content?.substring(0, 150).concat('...');
              return (
                <>
                  <Grid xs={12} sm={5} md={3} lg={3}>
                    <Link key={i} href={`${newLink}`} underline="none">
                      <Card
                        sx={{
                          width: '100%',
                          minHeight: 520,
                          maxHeight: 520,
                          boxShadow: '40px 40px 80px 0 20%',
                          alignItems: 'center'
                        }}
                      >
                        <CardMedia
                          style={{
                            display: 'center'
                          }}
                          component="img"
                          height={240}
                          src={`${f.link}`}
                        />
                        <Typography px={2} mt={2} mb={1} variant="h6">
                          {f.title}
                        </Typography>
                        <Typography px={2} mb={1} variant="body1" color={'text.disabled'}>
                          {newspaperName} · {publicDate}
                        </Typography>
                        <Typography px={2} mb={1} pb={2} variant="body2" color={'text.primary'}>
                          {content}
                        </Typography>
                      </Card>
                    </Link>
                  </Grid>
                </>
              );
            })}
        </Grid>
      </Container>

      {/* Press */}
    </>
  );
}
export default ProjectDetailPress;
