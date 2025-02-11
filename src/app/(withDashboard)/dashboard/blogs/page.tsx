
import { BlogCRUD  } from '@/components/shared/CRUDComponents';import type { Metadata } from 'next'
 
// either Static metadata
export const metadata: Metadata = {
  title: 'Blog Managment',
}

const UserInfoPage = () => {
  return (
    <div>
      <BlogCRUD/>
    </div>
  );
};

export default UserInfoPage;
