import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface JobBreadcrumbProps {
  jobNumber: string;
  jobId?: string;
  currentPage?: string;
  isClient?: boolean;
  accessToken?: string;
}

/**
 * Consistent breadcrumb component for all job-related pages.
 * Ensures Job is always the parent context for all inspections, estimates, and payments.
 */
const JobBreadcrumb = ({ 
  jobNumber, 
  jobId, 
  currentPage, 
  isClient = false,
  accessToken 
}: JobBreadcrumbProps) => {
  const jobLink = isClient && accessToken 
    ? `/client/${accessToken}` 
    : jobId 
      ? `/jobs/${jobId}` 
      : '/dashboard';
  
  const rootLink = isClient ? '/client/dashboard' : '/dashboard';
  const rootLabel = isClient ? 'My Jobs' : 'Jobs';

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={rootLink}>{rootLabel}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {currentPage ? (
            <BreadcrumbLink asChild>
              <Link to={jobLink}>Job #{jobNumber}</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>Job #{jobNumber}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {currentPage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentPage}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default JobBreadcrumb;
