import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function TrainPageWrite() {
    const type = useParams().id
    return (
        <>
            Write {type}
        </>
    )
}