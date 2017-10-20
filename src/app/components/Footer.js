import React, { Component } from "react";

import PropTypes from "prop-types";

export default function Footer({ year, company }, context) {

    return (

        <div>

            <hr />
            <p> Copyrights@{year}, {company}</p>
        </div>

    )

}

Footer.propTypes = {

  year: PropTypes.number.isRequired,
  company: PropTypes.string,

}

Footer.defaultProps = {

 company: "Home"

}
