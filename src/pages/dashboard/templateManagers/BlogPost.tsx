import { useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
// material
import { Box, Card, Divider, Skeleton, Container, Typography, Pagination } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getPost, getRecentPosts } from '../../../redux/slices/template_slice/blog';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// @types
import { BlogState } from '../../../@types/blog';
// components
import Page from '../../../components/Page';
import Markdown from '../../../components/Markdown';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  BlogPostHero,
  BlogPostTags,
  BlogPostRecent,
  BlogPostCommentList,
  BlogPostCommentForm
} from '../../../components/_dashboard/blog';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    <Skeleton width="100%" height={560} variant="rectangular" sx={{ borderRadius: 2 }} />
    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
      <Skeleton variant="circular" width={64} height={64} />
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
      </Box>
    </Box>
  </>
);

export default function BlogPost() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { title = '' } = useParams();
  const { post, error, recentPosts } = useSelector((state: { blog: BlogState }) => state.blog);

  useEffect(() => {
    dispatch(getPost(title));
    dispatch(getRecentPosts(title));
  }, [dispatch, title]);

  return (
    <Page title="Project: Post Details | Krowd">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chi tiết bài đăng"
          links={[
            { name: 'Bảng điều khiển', href: PATH_DASHBOARD.root },
            { name: 'Bài đăng', href: PATH_DASHBOARD.blog.root },
            { name: sentenceCase(title) }
          ]}
        />

        {post && (
          <Card>
            <BlogPostHero post={post} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {post.description}
              </Typography>

              <Markdown children={post.body} />

              <Box sx={{ my: 5 }}>
                <Divider />
                <BlogPostTags post={post} />
                <Divider />
              </Box>

              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography variant="h4">Bình luận</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  ({post.comments.length})
                </Typography>
              </Box>

              <BlogPostCommentList post={post} />

              {/* <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination count={8} color="primary" />
              </Box> */}
              {/*comment status*/}
              {/* <BlogPostCommentForm /> */}
            </Box>
          </Card>
        )}

        {!post && SkeletonLoad}

        {error && <Typography variant="h6">Bài đăng không tìm thấy</Typography>}

        {recentPosts.length > 0 && <BlogPostRecent posts={recentPosts} />}
      </Container>
    </Page>
  );
}
