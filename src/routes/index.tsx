import { connect } from 'react-redux';

const Index: React.FC = (props) => {
    return (
        <h1>Hello World</h1>
    );
};

export default connect(state => state)(Index);
