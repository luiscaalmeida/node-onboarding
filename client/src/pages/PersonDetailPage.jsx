import React from 'react'
import {useParams} from 'react-router-dom';
import {PageWrapper} from '../components/PageWrapper/PageWrapper';
import {getActorById, IMAGE_BASE_URL} from '../consts';
import {useQuery} from '@tanstack/react-query';
import baseApi from '../axios';
import { CustomHelmet } from '../components/CustomHelmet';
import { MemberCardDetail } from '../components/Actor/MemberCardDetail';

export const PersonDetailPage = () => {
  const {id} = useParams();

  const {isLoading, error, data} = useQuery({
    queryKey: ['getActor'],
    queryFn: () => baseApi.get(getActorById(id)),
    onSuccess: data => console.log(data),
    onError: err => console.log(err),
  });
  const shouldShowMedia = !isLoading && !error && !!data;

  return (
    <PageWrapper title={data?.data?.name}>
      {shouldShowMedia && (
        <>
          <CustomHelmet
            title={data?.data?.name}
            description={data?.data?.biography}
            imageUrl={`${IMAGE_BASE_URL}${data?.data?.profile_path}`}
          />
          <MemberCardDetail
            id={id}
            name={data?.data?.name}
            type={data?.data?.type}
            imageUrl={`${IMAGE_BASE_URL}${data?.data?.profile_path}`}
            biography= {data?.data?.biography}
            birthday={data?.data?.birthday}
            deathday={data?.data?.deathday}
            place_of_birth={data?.data?.place_of_birth}
            popularity={data?.data?.popularity}
            known_for_department={data?.data?.known_for_department}
          />
        </>
      )}
    </PageWrapper>
  )
};
