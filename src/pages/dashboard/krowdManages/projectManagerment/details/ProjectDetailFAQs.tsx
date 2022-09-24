import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Container,
  Box,
  Grid
} from '@mui/material';
import { Icon } from '@iconify/react';
import { MotionInView, varFadeIn } from 'components/animate';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
type FAQSProps = {
  id: string;
  title: string;
  content: string | null;
  link: string | null;
  description: string | null;
};
type FAQSListProps = {
  faqs: FAQSProps[] | undefined;
};
function ProjectDetailFAQs({ faqs }: FAQSListProps) {
  return (
    <>
      {/* Press */}
      <Container maxWidth={false} sx={{ paddingBottom: '5rem' }}>
        <Box mb={7}>
          <Typography textAlign="center" py={1} color={'#666'} variant="h4">
            Câu hỏi thắc mắc
          </Typography>
          <Box mx="auto" width={'10%'}>
            <Divider sx={{ my: 1, borderBottomWidth: 'thick', color: 'primary.main' }} />
          </Box>
        </Box>
        {faqs &&
          faqs.map((fqs, i) => (
            <>
              <Grid key={i} container>
                <Grid lg={3}></Grid>
                <Grid lg={6}>
                  <MotionInView variants={varFadeIn}>
                    <Accordion>
                      <AccordionSummary
                        style={{ paddingTop: '1rem', paddingBottom: '1rem', color: '#251E18' }}
                        expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}
                      >
                        <Typography variant="subtitle1">+ {fqs.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{fqs.content}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  </MotionInView>
                </Grid>
              </Grid>
            </>
          ))}
      </Container>
    </>
  );
}
export default ProjectDetailFAQs;
