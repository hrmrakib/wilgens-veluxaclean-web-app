import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  path?: string;
  breadcrumbs?: Breadcrumb[];
}

export default function CommonBanner({
  title,
  path,
  breadcrumbs: propBreadcrumbs,
}: PageHeaderProps) {
  // Generate breadcrumbs from path if provided
  const breadcrumbs = propBreadcrumbs || generateBreadcrumbs(path || "");

  // Function to generate breadcrumbs from a path
  function generateBreadcrumbs(path: string): Breadcrumb[] {
    // Remove leading and trailing slashes and split by slash
    const segments = path.replace(/^\/|\/$/g, "").split("/");

    if (segments.length === 1 && segments[0] === "") {
      return [{ label: "Home", href: "/" }];
    }

    // Start with Home
    const result: Breadcrumb[] = [{ label: "Home", href: "/" }];

    // Build up the breadcrumbs
    let currentPath = "";

    segments.forEach((segment) => {
      // Format the segment (capitalize first letter)
      const formattedSegment =
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

      // Build the path
      currentPath += `/${segment}`;

      // Add to breadcrumbs
      result.push({
        label: formattedSegment,
        href: currentPath,
      });
    });

    return result;
  }

  return (
    <div className='relative w-full overflow-hidden bg-[url("/banner2.png")] md:bg-[url("/common-banner.jpg")] bg-cover bg-center h-[412px]'>
      <div className='h-full w-full bg-[] flex items-center justify-between'>
        <div className='h-full md:h-auto container mx-auto flex flex-col md:flex-row items-center justify-center'>
          <div className='text-center md:px-4 py-6 md:py-6'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A4A4A] mb-4'>
              {title}
            </h1>
            <nav aria-label='Breadcrumb' className="flex items-center justify-center gap-2">
              <svg
                width='16'
                height='17'
                viewBox='0 0 16 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M15.0486 7.23344C14.6515 6.85344 14.2646 6.46344 13.8675 6.08344V2.34344C13.8675 1.67344 13.3177 1.13344 12.6355 1.13344C11.9534 1.13344 11.4035 1.67344 11.4035 2.34344V3.65344L9.18392 1.47344C8.89883 1.13344 8.51193 0.893437 8.08429 0.773438H7.65666C7.21885 0.893437 6.83194 1.14344 6.54685 1.48344C4.60214 3.40344 2.65743 5.31344 0.712721 7.21344C0.366542 7.49344 0.122181 7.87344 0 8.29344V8.71344C0.0407269 8.86344 0.101817 9.00344 0.162908 9.14344C0.397087 9.61344 0.875629 9.91344 1.41526 9.91344H1.69017V10.1034C1.69017 11.5534 1.70035 13.0134 1.69017 14.4634C1.64944 15.3234 2.27053 16.0634 3.13597 16.2034C3.14615 16.2034 3.16652 16.2134 3.1767 16.2234H6.00722C6.25158 16.1434 6.40431 15.9034 6.37376 15.6434C6.37376 14.5034 6.37376 13.3634 6.37376 12.2134C6.32285 11.7934 6.62831 11.4034 7.05594 11.3534C7.11703 11.3534 7.17812 11.3534 7.24939 11.3534H8.55265C8.98029 11.3134 9.35701 11.6234 9.39774 12.0434C9.39774 12.0834 9.39774 12.1334 9.39774 12.1734V15.6234C9.36719 15.8734 9.51992 16.1134 9.76428 16.2034H12.5948C12.6966 16.1734 12.7883 16.1534 12.8901 16.1234C13.5824 15.9134 14.061 15.2934 14.0711 14.5734C14.0711 13.0834 14.0711 11.5834 14.0711 10.0934V9.89344H14.3053C15.0079 9.89344 15.6188 9.40344 15.741 8.72344C15.741 8.70344 15.7613 8.67344 15.7715 8.65344V8.29344C15.6595 7.86344 15.4151 7.47344 15.069 7.19344'
                  fill='#4A4A4A'
                />
              </svg>

              <ol className='flex justify- items-center flex-wrap'>
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className='flex items-center'>
                    {index > 0 && (
                      <ChevronRight
                        className='h-4 w-4 mx-2 text-[#4A4A4A]'
                        aria-hidden='true'
                      />
                    )}
                    {index === breadcrumbs.length - 1 ? (
                      <span className='text-[#4A4A4A]' aria-current='page'>
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className='text-[#4A4A4A] hover:text-amber-200 transition-colors'
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
          {/* <div className=''></div> */}
        </div>
      </div>
    </div>
  );
}
