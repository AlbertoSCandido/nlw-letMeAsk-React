import { ReactNode } from 'react'
import './styles.scss';
import cx from 'classnames'

type QuestionProps = {
  content: string,
  author: {
    name: string,
    avatar: string,
  };
  children?: ReactNode,
  isAnswered?: boolean,
  isHighlighted?: boolean,
}

const Question = ({
  content,
  author: {name, avatar},
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) => {

  return (
    <div className={cx(
      'question',
      { 'answered': isAnswered },
      { 'highlighted': isHighlighted && !isAnswered },
    )}>
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
