import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationItem } from '@mui/material';


type Tprops = {
  page: number,
  pagination: (e: any, data: any) => void
  pageChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
  defaultp?:number;
  variant?: "outlined" | "text"
  shape?: "circular" | "rounded"
}

export const scrollTop = (val?:number) => {
	window.scrollTo({
		top:val??0,
		behavior: "smooth"
	})
}

const PaginationRounded: React.FC<Tprops> = ({ page, pagination,defaultp,hideNextButton,hidePrevButton, variant, shape }) => {

  return (
    <Stack spacing={2} style={{marginTop:"15px"}}>
      <Pagination count={page} variant={variant} shape={shape}  defaultPage={defaultp}  onChange={(e:any,value:any)=> { scrollTop(); pagination(e,value) }} renderItem={(item) => (
    <PaginationItem
      components={{
        last: (props) => <button {...props}>Last</button>,
        next: (props) => <button className='btn-pagination' {...props}>Next</button>,
        first: (props) => <button {...props}>First</button>,
        previous: (props) => <button className='btn-pagination' {...props}>Prev</button>
      }}
      {...item}
    />
  )} />
    </Stack>
  );
}
export default PaginationRounded;
