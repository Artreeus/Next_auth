import { ProjectCRUD } from '@/components/shared/CRUDComponents';
import type { Metadata } from 'next'
 
// either Static metadata
export const metadata: Metadata = {
  title: 'Peoject Managment',
}
const page = () => {
    return (
        <div>
            <ProjectCRUD/>
        </div>
    );
};

export default page;