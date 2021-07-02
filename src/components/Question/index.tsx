import { ReactNode } from 'react'
import './styles.scss';

type QuestionProps = {
  content: string,
  author: {
    name: string,
    avatar: string,
  };
  children?: ReactNode;
}

const Question = ({
  content,
  author: {name, avatar},
  children,
}: QuestionProps) => {

  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={avatar} alt={name} />
          <span>{name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  )
}

export default Question
