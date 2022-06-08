import { InterviewerEntity } from '../interviewer.entity';

export type InterviewerType = Omit<InterviewerEntity, 'generateLink'>;