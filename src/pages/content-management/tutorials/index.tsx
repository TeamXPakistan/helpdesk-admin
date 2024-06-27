import CustomButton from '@components/common/Button/custom-button'
import CustomError from '@components/common/error/custom-error'
import Spinner from '@components/common/spinner/spinner'
import TutorialList from '@components/content-management/tutorial/tutorial-list'
import { useTutorialQueries } from '@data/tutorial/tutorials-query'
import AdminLayout from '@layouts/admin-layout'
import { Card, CardContent, Icon, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useModal } from '@store/apps/modal'
import { superAdmin_and_AdminStaff } from '@utils/auth-utils'
import { AdminStaffPermissions } from '@utils/constants'
import React, { ReactNode, useState } from 'react'

const index = () => {
  const [text, setText] = useState<string>('')
  const [setSearchVal] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const { openModal } = useModal();

  const { data: tutorials, isLoading, error } = useTutorialQueries({
    limit: Number(process.env.NEXT_PUBLIC_PAGINATED_QUERY_LIMIT),
    page: page,
    text
  });

  console.log(tutorials)
  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onReset = () => {
    setPage(1); setText(''); setSearchVal('')
  };

  if (isLoading) return <Spinner />
  if (error) return <CustomError errorMsg={error.message} />

  return (
    <>
      <Box
        sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}
      >
        <Typography variant='h4' sx={{ color: "text.primary" }}>TUTORIAL</Typography>
        <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <CustomButton
            type="button"
            variant='contained'
            fullWidth={false}
            onClick={() => openModal({ view: "CREATE_TUTORIAL" })}
            //@ts-ignore
            startIcon={<Icon color='white' fontSize='1.625rem' Icon={'mdi:add-bold'} />}
          >
            Create Tutorial
          </CustomButton>
        </Box>
      </Box>

      <Card sx={{ borderRadius: 2 }}>
        <CardContent>
          <TutorialList
            onPaginationChange={onPageChange}
            data={tutorials.tutorial.data}
            paginatorInfo={tutorials.tutorial.paginatorInfo}
          />
        </CardContent>
      </Card>
    </>
  )
}

index.authProps = {
  allowedRoles: superAdmin_and_AdminStaff,
  adminStaffPermissions: [AdminStaffPermissions.USERS]
}

index.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>

export default index