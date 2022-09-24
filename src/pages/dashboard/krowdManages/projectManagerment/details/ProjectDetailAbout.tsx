import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Divider,
  Grid,
  Link,
  styled,
  Typography
} from '@mui/material';

type AboutProps = {
  id: string;
  title: string;
  content: string | null;
  link: string | null;
  description: string | null;
};
type AboutListProps = {
  abouts: AboutProps[] | undefined;
};
function ProjectDetailAbout({ abouts }: AboutListProps) {
  return (
    <>
      {/* About */}
      <Container maxWidth={'lg'} sx={{ paddingBottom: '3rem' }}>
        <Grid container display={'flex'} justifyContent={'space-evenly'}>
          <Grid>
            {abouts &&
              abouts
                .filter((ab) => ab.title !== 'Truyền thông')
                .slice(0, 3)
                .map((ab, i) => (
                  <Box key={i}>
                    <Button
                      href={`${ab.link}`}
                      target="_blank"
                      disabled={ab.link === null}
                      sx={{ opacity: ab.link ? 1 : 0.4 }}
                    >
                      <Card sx={{ borderRadius: '45% 0% 0% 45%', height: 100 }}>
                        <Grid
                          container
                          display={'flex'}
                          alignItems="center"
                          justifyContent={'center'}
                        >
                          <Grid sx={{ mt: 2.6 }}>
                            <img
                              style={{ borderRadius: '50%', width: 60 }}
                              src={`/static/icons/navbar/${ab.title}.png`}
                            />
                          </Grid>
                          <Grid>
                            <Typography textAlign={'center'} sx={{ mx: 2, mt: 4, width: 200 }}>
                              Theo dõi chúng tôi qua{' '}
                              <Typography textAlign={'center'} sx={{ fontWeight: '700' }}>
                                {ab.title}
                              </Typography>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Card>
                    </Button>
                    {/* {user?.role === ROLE_USER_TYPE.PROJECT_MANAGER && project.status === 'DRAFT' && ( */}
                  </Box>
                ))}
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ mb: 7 }}>
        <Divider variant="fullWidth" />
      </Box>
      {/* Press */}
    </>
  );
}
export default ProjectDetailAbout;
