/* eslint-disable @typescript-eslint/no-explicit-any */

import Head from 'next/head';
import { HasNoTasks } from '../components/HasNoTasks';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import { DateInput } from '../components/DateInput';
import { TextInput } from '../components/TextInput';
import logo from "../assets/logo.svg"
import { withApollo } from '../lib/withApollo';
import { useCreateReminderMutation, useDeleteReminderMutation, useGetRemindersQuery } from '../graphql/generated/graphql';
import { useAuth } from '../contexts/Auth.context';
import { Reminder } from '../components/Reminder';
import {isBefore, parseISO} from 'date-fns';
import { useEffect } from 'react';
import { socket } from '../lib/socket';
import toast from '../components/Toast';
interface IReminderProps {
  description: string;
  datetime: string;
}


function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth()
  const { data, loading, refetch } = useGetRemindersQuery({
    variables: {
      userId: user?.id
    }
  })
  const [createReminder] = useCreateReminderMutation()
  const [deleteReminder] = useDeleteReminderMutation()
  const reminders = data?.reminders || []
  async function handleCreateReminder(data: IReminderProps) {
    try {
      await createReminder({
        variables: {
          input: {
            description: data.description,
            datetime: data.datetime,
            userId: user?.id
          }
        }
      })
      toast({ type: 'success', message: 'Lembrete criado com sucesso, você será notificado no horário agendado' })
      refetch();
      reset();
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSearchReminder(data: IReminderProps) {
    try {
      refetch({
        datetime: data.datetime,
        description: data.description,
        userId: user.id
      });
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDeleteReminder(id: string) {
    try {
      await deleteReminder({
        variables: {
          id
        }
      })
      refetch();
      reset();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() =>{
    if(user && user.id){
      console.log('connected to socket ')
      socket.connect()
      socket.emit('joinRoom', user.id)
      socket.on('reminder-alert', (message) => {
        toast({ type: 'info', message: message });
      });
    }
  }, [user]);


  return (
    <>
      <Head>
        <title>MindMinder - Lembretes personalizados</title>
      </Head>
      <div>
      <header className="bg-gray-700 h-52 flex items-center justify-center">
        <Image
          className="h-100 w-245"
          width={245}
          height={245}
          src={logo}
          alt="Mindminder"
        />
      </header>
      <main className="h-screen flex flex-col items-center">
        <form
          className="flex justify-center gap-[8px]"
          onSubmit={handleSubmit(handleCreateReminder as any)}
        >
          <TextInput
            error={String(errors.root?.description)}
            placeholder="Adicionar ou buscar lembretes"
            {...register('description')}
          />

          <DateInput
            placeholder="Selecione uma data"
            error={String(errors.root?.date)}
            {...register('datetime')}
          />
          <PrimaryButton isLoading={loading} type="submit" />
          <SecondaryButton isLoading={loading} type="button" onClick={handleSubmit(handleSearchReminder as any)} />
        </form>

        <div className=" text-gray-100 mt-[64px] w-[736px]">
          <div className="pb-[24px] flex flex-row justify-between ">
            <p className="text-blue-light font-bold text-[14px] ">
              Lembretes criados
              <span className="ml-[8px] bg-gray-400 text-gray-200 rounded-full py-0.5 px-2">
                {reminders.length}
              </span>
            </p>

            <p className="text-purple-light font-bold text-[14px]">
              Concluídas
              <span className="ml-[8px] bg-gray-400 text-gray-200 rounded-full py-0.5 px-2">
                {reminders.filter(reminder => {
                  return isBefore(parseISO(reminder.datetime), new Date())
                }).length}
              </span>
            </p>
          </div>

          {reminders.length === 0 ? (
            <HasNoTasks />
          ) : (
            reminders.map((reminder) => (
              <Reminder
                key={reminder.id}
                id={reminder.id}
                description={reminder.description}
                onComplete={() => { /* TODO */}}
                onRemove={() => handleDeleteReminder(reminder.id)}
                completed={false}
                datetime={reminder.datetime}
              />
            ))
          )}
        </div>
      </main>
    </div>

    </>
  );
}

/**
 * @todo Implementar SSR
 */
// export const getServerSideProps: GetServerSideProps = async () => {
//   const data = await getServerPageGetReminders( {} as any, undefined);

//   return {
//     props: {},
//   };
// };

// export default withApollo(
//   ssrGetReminders.withPage()(Home)
// );

export default withApollo(Home)
